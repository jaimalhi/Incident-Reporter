export class IncidentReport {
  key: number;
  time: Date;
  status: string;
  picture: string;
  location: number[];
  extraInfo: string;
  reporterName: string;
  reporterNum: string;
  criminalName: string;

  constructor(
    key: number,
    time: Date,
    status: string,
    picture: string,
    location: number[],
    extraInfo: string,
    reporterName: string,
    reporterNum: string,
    criminalName: string
  ) {
    this.key = key;
    this.time = time;
    this.status = status;
    this.picture = picture;
    this.location = location;
    this.extraInfo = extraInfo;
    this.reporterName = reporterName;
    this.reporterNum = reporterNum;
    this.criminalName = criminalName;
  }
}
