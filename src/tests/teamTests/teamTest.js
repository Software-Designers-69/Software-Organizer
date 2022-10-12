function checkTeams(arr, team) {
    if (!arr.includes(team)) {
        return false
    }
    else {
        return true
    }
}

function deleteTeam(arr, team) {
    if (checkTeams(arr, team)) {
        const filtered = arr.filter(function (tea) {
            return tea != team;
        });
        return "Done"
    }
    else {
        return "Cannot delete team as it does not exist in the database"
    }

}

function addTeam(arr, team) {
    if (checkTeams(arr, team)) {
        return "team already exists in the database"
    }
    else {
        arr.push(team);
        return "Done"
    }
}

function editTeam(arr, team, newteam) {
    if (checkTeams(arr, team)) {
        arr.map((tea) => {
            if (tea == team) {
                tea = newteam;
            }
        })
        return "Done"
    }
    else {
        return "team does not exist in the database"
    }

}

module.exports = [deleteTeam, addTeam, editTeam];