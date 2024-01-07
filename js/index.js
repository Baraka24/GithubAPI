import config from './config.js';
import query from './constants.js';

async function makeGraphQLRequest(query) {
    try {
        const response = await axios.post(config.GRAPHQL_ENDPOINT, {
            query: query
        }, {
            headers: {
                'Authorization': `Bearer ${config.API_TOKEN}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error making GraphQL request:', error);
        throw error;
    }
}


makeGraphQLRequest(query)
    .then(data => {
        const users = data.data.search.edges;
        const tableBody = document.querySelector('#userTable tbody');
        const title = document.querySelector('#title');
        title.textContent = `Showing ${users.length} developers in ${users[0].node.location}`;

        users.forEach(user => {
            const row = tableBody.insertRow();

            const usernameCell = row.insertCell();
            const profileLink = document.createElement('a');
            profileLink.href = `https://github.com/${user.node.login}`;
            profileLink.innerText = user.node.login;
            profileLink.target = '_blank';
            profileLink.rel = 'noopener noreferrer';
            usernameCell.appendChild(profileLink);
        
            const nameCell = row.insertCell();
            nameCell.textContent = user.node.name || '-';
        
            const companyCell = row.insertCell();
            companyCell.textContent = user.node.company || '-';
            
            const contributionCell = row.insertCell();
            const commits = user.node.contributionsCollection.totalCommitContributions;
            const pullRequests = user.node.contributionsCollection.totalPullRequestContributions;
            const totalContributions = user.node.contributionsCollection.contributionCalendar.totalContributions;
            contributionCell.innerHTML = `Commits: <b>${commits}</b><br>Pull Requests: <b>${pullRequests}</b><br>Total Contrib.: <b>${totalContributions}</b>`;
        });
    })
    .catch(error => {
        // Handle errors
        console.error('Error making request to GitHub GraphQL API:', error);
    });

    