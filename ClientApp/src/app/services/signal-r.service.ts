import { Injectable } from '@angular/core';
import { HttpTransportType, HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: any;

  public startConnection() {
    return new Promise((resolve, reject) => {
      this.hubConnection = new HubConnectionBuilder()
        .withUrl("/chathub", {
          skipNegotiation: true,
          transport: HttpTransportType.WebSockets
        }).build();

      this.hubConnection.start()
        .then(() => {
          console.log("connection established");
          return resolve(true);
        })
        .catch((err: any) => {
          console.log("error occurred" + err);
          reject(err);
        });
    });
  }

  public listenToAllFeeds() {
    (<HubConnection>this.hubConnection).on("ReceiveMessage", (data: any) => {
      console.log("ReceiveMessage: ", data);
    });
  }
}
