const express = require('express');
const path = require('path');
require("dotenv").config();

const db = require('./config/mongoose');
const Projects = require('./models/Projects');
const Issues = require('./models/Issues');
const { cursorTo } = require('readline');

const app =express();
const PORT = process.env.PORT || 8000;

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static("assets"));
app.use(express.urlencoded());

// getting an array of authors with no duplicates to show them on filter options
function uniquAuthors(issues){
    let authors=[];
    for(let i of issues){
        if(authors.length === 0){
            authors.push(i.author);
        }else{
            for(let j =0; j<authors.length; j++){
                if(authors[j] === i.author)
                {
                    continue;
                }
                else{
                    if(j!=authors.length-1){
                        continue;
                    }else{
                        authors.push(i.author);
                    }
                }
            }
        }
    }
    return authors;
}


// route for home page
app.get('/', async(req, res)=>{
    Projects.find({},(err, projects)=>{
        return res.render("home", {stored_projects: projects});
    })
})

// route to add new project
app.post('/addNewProject', async(req, res)=>{
    Projects.create({
        nameOfProject: req.body.project,
        description: req.body.desc,
        author: req.body.author
    },()=>{
        Projects.find({},(err, projects)=>{
            return res.render("home", {stored_projects: projects});
        })
    });
})

// route to get details of a specific project
app.get('/details', (req, res)=>{

    let id = req.query.id;

    Projects.findById(id, (err, projectDetail)=>{
        if(err){
            return console.log("error finding the project with given id.");
        }
        Issues.find({projectId: id},(err, issues)=>{
            let labels = [];
            issues.map((issue)=>{
                issue.labels.map((item)=>{
                    if(!labels.includes(item)){
                        labels.push(item);
                    }
                })
            })
            let authors=uniquAuthors(issues);
            return res.render('projectDetails',{project_detail: projectDetail, issues:issues, authors, labels});
        })

    })
})

// route to add a new bug to a project
app.post("/addbug", (req, res)=>{
    let id = req.query.id;
    let label = req.body.label.split(",");
    let title=req.body.title, description=req.body.description, author=req.body.author;
    let keys = Object.keys(req.body);

    Issues.create({
        projectId: id,
        title: title,
        description: description,
        author: author,
        labels: label
    })

    Projects.findById(id, (err, project)=>{
        Issues.find({projectId: id}, (err, issues)=>{
            let authors=uniquAuthors(issues);
            let labels = [];
            issues.map((issue)=>{
                issue.labels.map((item)=>{
                    if(!labels.includes(item)){
                        labels.push(item);
                    }
                })
            })
            return res.render("projectDetails", {project_detail: project, issues: issues, authors, labels});
        })
    })
})

// route for filtering out bugs using author name and labels
app.post("/filter", async (req, res)=>{
    let projectId = req.query.id;
    let filters = Object.keys(req.body);
    let allLabels = [];
    let issues =[];

    let authors=[]
    Issues.find({projectId},(err, is)=>{
        authors = uniquAuthors(is);
    })

    let allIssuesByAuthor = await Issues.find({author:{$in: filters}, projectId})
    let allIssuesByLabel = await Issues.find({labels:{$in: filters}, projectId})

    let pd=[];
    if(allIssuesByAuthor.length ===0){
        pd = [...allIssuesByLabel]
    }else if(allIssuesByLabel.length ===0){
        pd = [...allIssuesByAuthor]
    }
    else{
        pd = [...allIssuesByAuthor, ...allIssuesByLabel];
    }

    Projects.findById(projectId,(err, project)=>{
        Issues.find({projectId}, (err, issues)=>{
            let labels = [];
            issues.map((issue)=>{
                issue.labels.map((item)=>{
                    if(!labels.includes(item)){
                        labels.push(item);
                    }
                })
            })
            return res.render("projectDetails", {project_detail: project, issues:pd, authors, labels});
        })
    })

})

// route for searching and issue by it's title or description
app.post('/search', (req, res)=>{
    let projectId = req.query.id;
    let iS = [];
    Issues.find({projectId}, (err, issues)=>{
        for(let issue of issues){
            if(issue.title.toLowerCase() === req.body.search.toLowerCase() || 
            issue.description.toLowerCase() === req.body.search.toLowerCase()){
                iS.push(issue);
            }
        }
    })

    let authors=[]
    Issues.find({projectId},(err, is)=>{
        authors = uniquAuthors(is);
    })

    Projects.findById(projectId, (err, project)=>{
        Issues.find({projectId}, (err, issues)=>{
            let labels = [];
            issues.map((issue)=>{
                issue.labels.map((item)=>{
                    if(!labels.includes(item)){
                        labels.push(item);
                    }
                })
            })
            return res.render("projectDetails", {project_detail: project, issues: iS, authors, labels});
        })
    })
})


db().then(()=>{
    app.listen(PORT, ()=>{
        console.log("App is up and runnig at port", PORT);
    })
})