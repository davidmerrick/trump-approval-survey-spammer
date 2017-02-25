import axios from 'axios'
import jquery from 'jquery'
import MessageType from '../constants/MessageType'
import RandomUser from '../models/RandomUser'
import Constants from '../constants/Constants'

let url = Constants.RANDOM_USER_ENDPOINT;

// First, fetch random user data
axios.get(url).then(response => {
    let data = response.data;
    let results = data.results;
    let user = new RandomUser(results[0]);

    let firstName = user.getFirstName();
    let lastName = user.getLastName();
    let zipCode = user.getLastName();
    let emailAddress = user.getEmailAddress();
    console.log(`First: ${firstName}`);
    console.log(`Last: ${lastName}`);
    console.log(`e-mail: ${emailAddress}`);

    // Fetch CSRF token
    let csrfToken = jquery("input[name=csrfmiddlewaretoken]").val();
    console.log(`CSRF token: ${csrfToken}`);

    // Assemble payload

    let payload = `csrfmiddlewaretoken=${csrfToken}`;
    payload += `&question_3412_0=Disapprove`;
    payload += `&question_3412_1=&question_3413_0=Disapprove&question_3413_1=&question_3414_0=Disapprove&question_3414_1=`;
    payload += `&question_3415_0=Disapprove&question_3415_1=&question_3416_0=Disapprove&question_3416_1=`;
    payload += `&question_3417_0=Disapprove&question_3417_1=&question_3418_0=Disapprove&question_3418_1=`;
    payload += `&question_3419_0=Disapprove&question_3419_1=&question_3420_0=Disapprove&question_3420_1=`;
    payload += `&question_3421_0=Disapprove&question_3421_1=&question_3422_0=Disapprove&question_3422_1=`;
    payload += `&question_3423_0=Disapprove&question_3423_1=&question_3424_0=Disapprove&question_3424_1=`;
    payload += `&question_3425_0=Disapprove&question_3425_1=&question_3426_0=Disapprove&question_3426_1=`;
    payload += `&question_3427_0=Disapprove&question_3427_1=&question_3428_0=Disapprove&question_3428_1=`;
    payload += `&question_3429_0=Disapprove&question_3429_1=&question_3430_0=Disapprove&question_3430_1=`;
    payload += `&question_3431_0=Disapprove&question_3431_1=&question_3432_0=Disapprove&question_3432_1=`;
    payload += `&question_3433_0=Disapprove&question_3433_1=&question_3434_0=Disapprove&question_3434_1=`;
    payload += `&question_3435_0=Disapprove&question_3435_1=&question_3436_0=Other&question_3436_1=Get+impeached&question_3437=&`;
    payload += `full_name=${firstName}+${lastName}`;
    payload += `&first_name=${firstName}`;
    payload += `&last_name=${lastName}`;
    payload += `&email=${emailAddress}`;
    payload += `&postal_code=${zipCode}`;
    payload += `&svid=307&utm_source=NA&utm_medium=NA&utm_campaign=NA&utm_content=NA&ad_flight=NA&ilist=&pgtype=None&respond=Record+My+Responses+%3E%3E`;

    let message = {
        id: MessageType.SUBMIT_FORM,
        payload: payload
    };
    chrome.runtime.sendMessage(message, callback => {
        if(callback && callback.error){
            alert(`Error submitting survey. Server returned: ${callback.error}`);
        }
    });
});


