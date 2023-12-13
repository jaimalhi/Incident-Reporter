# Angular Incident Reporter

### Functionality

- An interactive incident reporting application
- allows users to create new incident reports with:
  - Reporting Person’s Info: Name and phone number of the witness.
  - Incident Info
  - Geographic Location
  - Picture Link (optional)
  - Additional Info
- Upon report submission, the system logs the report with these details and auto-fills:
  - Time/Date: The date and time when the report was logged.
  - Status: Initially set to OPEN.
- Admin users are able to review reports and respond accordingly
  - can update all report status via password

### API info

- leaflet with typescript: `npm install leaflet` `npm install @types/leaflet`
- Geocoding: `https://geocode.maps.co/`
- Hashify: `https://hashify.net/`

### Environment

- utilizes the `environments` folder in root directory containing API key to access database
- Format: ` export const env = {
  production: false,
  apiUrl: 'https://your-backend-here.com/',
};`

### Backend Interaction

- Data was send to the backend in the JSON format
- Here is an example of data sent with a POST request:

```
{
  "key":"0",
  "data": [
      {
        "reporterName": "Harold",
        "reporterNum": "6046664444",
        "criminalInfo": "Johnny Dang",
        "location": [41.854551, -87.637683],
        "picture": "https://img.texasmonthly.com/2019/11/johny-dang-throne.jpg?auto=compress&crop=faces&fit=fit&fm=jpg&h=0&ixlib=php-3.3.1&q=45&w=1250",
        "extraInfo": "scams rappers out of 1 million",
        "time": "2023-11-30T22:10:44.964Z",
        "status": "open"
      }
    ]
}
```

### Demo

![Home page of Incident Reporoter](/src/assets/incident-report-home.png)

![Add page of Incident Reporoter](/src/assets/incident-report-add.png)
