function checkStory(arr, story) {
    if (!arr.includes(story)) {
        return false
    }
    else {
        return true
    }
}

function deleteStory(arr, story) {
    if (checkStory(arr, story)) {
        const filtered = arr.filter(function (tea) {
            return tea != story;
        });
        return "Done"
    }
    else {
        return "Cannot delete story as it does not exist in the database"
    }

}

function addStory(arr, story) {
    if (checkStory(arr, story)) {
        return "story already exists in the database"
    }
    else {
        arr.push(story);
        return "Done"
    }
}

function editStory(arr, story, newstory) {
    if (checkStory(arr, story)) {
        arr.map((tea) => {
            if (tea == story) {
                tea = newstory;
            }
        })
        return "Done"
    }
    else {
        return "story does not exist in the database"
    }

}

function addWiki(oldwiki, newwiki) {
    if (oldwiki == newwiki){
        return "Nothing has changed"
    }
    if (newwiki == ""){
        return oldwiki
    }
    else {
        oldwiki = oldwiki.concat(newwiki);
        return oldwiki
    }

}

module.exports = [deleteStory, addStory, editStory, addWiki];