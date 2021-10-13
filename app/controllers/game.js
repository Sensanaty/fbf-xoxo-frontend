import Controller from '@ember/controller';
import {action} from "@ember/object";
import {tracked} from "@glimmer/tracking";
import axios from 'axios';
import ENV from 'fbf-xoxo-frontend/config/environment';

export default class GameController extends Controller {
  @tracked usernameSet = false;
  @tracked autoSend;

  @action postScore() {
    const input = document.querySelector("#username-field");

    document.querySelector("#submit-btn").disabled = true;
    input.disabled = true;
    input.classList.add("disabled");

    this.usernameSet = true;
    const username = document.getElementById("username-field").value;
    localStorage.setItem("username", username);

    this.sendScore();
  }

  sendScore() {
    const existingID = this.store.peekAll('score').filterBy("username", localStorage.getItem("username"));
    const wins = localStorage.getItem("wins");
    const draws = localStorage.getItem("draws");
    const losses = localStorage.getItem("losses");

    if (existingID.length !== 0) {
      axios({
        method: "patch",
        url: `${ENV.API_ENDPOINT}scores/${existingID[0].id}?wins=${wins}&losses=${losses}&draws=${draws}`,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then(() => {
        window.location.href = "/"
      }).catch(error => {
        alert("There was an error while sending the score: ", error)
        }
      )
    } else {
      console.log("else");
      axios({
        method: "post",
        url: `${ENV.API_ENDPOINT}scores?wins=${wins}&losses=${losses}&draws=${draws}&username=${localStorage.getItem("username")}`,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      }).then(() => {
          window.location.href = "/"
      }).catch(error => {
        alert("There was an error while sending the score: ", error)
        }
      )
    }
  }
}
