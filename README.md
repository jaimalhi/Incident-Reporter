# Villian (Incident) Reporter

## Functionality

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

## API info

- leaflet with typescript & `npm install leaflet` `npm install @types/leaflet`
- Geocoding `https://geocode.maps.co/`

## Technologies

- Angular
- Leaflet
