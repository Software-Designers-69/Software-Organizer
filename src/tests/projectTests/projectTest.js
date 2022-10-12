function checkProjects(arr, project){
    if (!arr.includes(project)){
        return false
    }
    else {
        return true
    }
}

function deleteProject(arr, project){
    if (checkProjects(arr, project)){
        const filtered = arr.filter(function (proj) {
            return proj != project;
        });
        return "Done"
    }
    else {
        return "Cannot delete project as it does not exist in the database"
    }
    
}

function addProject(arr, project){
    if (checkProjects(arr, project)){
        return "Project already exists in the database"
    }
    else {
        arr.push(project);
        return "Done"
    }
}

function editProject(arr, project, newproject){
    if (checkProjects(arr, project)){
        arr.map((proj) =>{
            if (proj == project){
                proj = newproject;
            }
        })
        return "Done"
    }
    else {
        return "Project does not exist in the database"
    }   
    
}

module.exports = [deleteProject, addProject, editProject];