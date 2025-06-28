let ServiceLocator = require("../../../framework/servicelocator");
export async function updateEventsList() {
    let eventsToUpdateArray = ['10001', '10002', '10003', '10004', '10005', '10009', '100012', '100013', '100018', '100019', '100020'];
    let EventsModel = ServiceLocator.resolve('EventsModel');
    let events = await EventsModel.find({}).exec();
    eventsToUpdateArray.forEach(async (eventCode) => {
        if (eventCode && events && events.length > 0) {
            let event = events.find(({ code }) => code == eventCode);
            if (event) {
                // to make it run only one time
                if (event.pushNotification.Email != true) {
                    event.name = "Alert! " + event.name;
                    event.messageInfo.message = "Alert! " + event.messageInfo.message;
                    event.pushNotification.Email = true;

                    let updatedEvent = new EventsModel(event);
                    updatedEvent.save();
                }
            }
        }
    })
}
