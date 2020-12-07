import React from 'react';

// Function to get text string corresponding to given date - i.e. '7 days ago'
const getTimeAgoString = (timestamp) => {
    const SECOND = 1000
    const MINUTE = SECOND * 60
    const HOUR = MINUTE * 60
    const DAY = HOUR * 24
    const MONTH = DAY * 30
    const YEAR = DAY * 365

    const elapsed = Date.now() - timestamp,
        getElapsedString = (value, unit) => {
            const round = Math.round(elapsed / value);
            return `${round} ${unit}${round > 1
                ? 's'
                : ''} ago`;
        };
    if (elapsed < MINUTE) {
        return getElapsedString(SECOND, 'second');
    }
    if (elapsed < HOUR) {
        return getElapsedString(MINUTE, 'minute');
    }
    if (elapsed < DAY) {
        return getElapsedString(HOUR, 'hour');
    }
    if (elapsed < MONTH) {
        return getElapsedString(DAY, 'day');
    }
    if (elapsed < YEAR) {
        return getElapsedString(MONTH, 'month');
    }
    return getElapsedString(YEAR, 'year');
}

function assignmentFormat (data){
        return `---  Assigned to: ${data.assignees.map(x => { return " " + x.login })}`
} 

function whichTimeFormat(data){
    const createdAt = getTimeAgoString(new Date(data.created_at))
    const updatedAt = getTimeAgoString(new Date(data.updated_at))
    const user = data.user.login
    if(createdAt !== updatedAt){
        return `#${data.number} created ${createdAt} by ${user} (updated ${updatedAt})`
    }
    return `#${data.number} created ${createdAt} by ${user}`
}

// renders the '#999 7 days ago by user -- Assigned to user1 user2' string for each issue
const DateIssueComponent = ({ data }) => {
    let timeAgoString = whichTimeFormat(data);

    const assigneesString = assignmentFormat(data);
    return (
        <React.Fragment>
            {timeAgoString} {(data.assignees.length>0) && assignmentFormat(data)}
        </React.Fragment>
    )
}

export default DateIssueComponent;