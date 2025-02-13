# Hapio Booking Flow for React

A component built for the Hapio API that can be installed as an npm package. Users can pass a configuration JSON object to the `flow` component after importing the package to customize settings

## Features

-   **Easy Booking:** Streamlined booking process.
-   **Get started fast:** Works out of the box with just an Hapio Api Token, no other setup needed.
-   **Hapio API Integration:** Manage resources, schedules, and bookings with Hapio's lightning quick API.
-   **Customizable:** Override the default configuration with your own settings, texts and theme configurations.

## Requirements

-   React 18
-   ReactDOM 18
-   Hapio State Manager

## Installation

Install the package with your favourite package manager

```sh
npm install hapio-booking-flow-react
```

```sh
yarn add hapio-booking-flow-react
```

## Usage

Import the `Flow` component in your project and pass hapioApiToken and your custom configuration if needed.

```tsx
// Example usage in a React app
import React from 'react';
import { Flow } from 'hapio-booking-flow-react';

const userConfig = {
  "hapioApiToken": "HAPIO_API_TOKEN",
  ... Optional config settings ...
};

function App() {
  return <Flow config={userConfig} />;
}

export default App;
```

## Configuration and Settings

Hapio Booking Flow comes with a default config for all settings, all of these settings can be changed by passing a JSON object to the `Flow` component.

#### Default config

```json
{
    "hapioApiToken": "",
    "hapioBaseURL": "https://eu-central-1.hapio.net/v1",
    "settings": {
        "locale": "en-GB",
        "storeExpireTime": 84000000,
        "afterBookingExipreTime": 300000,
        "metaDataFields": {
            "name": {
                "required": true,
                "type": "text",
                "size": "full",
                "label": "Name",
                "placeholder": "Name"
            },
            "email": {
                "required": true,
                "type": "email",
                "size": "half",
                "label": "Email",
                "placeholder": "Email"
            },
            "phone": {
                "required": true,
                "type": "tel",
                "size": "half",
                "label": "Phone",
                "placeholder": "Phone"
            }
        }
    },
    "theme": {
        "palette": {
            "primary": "#F6C800",
            "secondary": "#B1BCFD",
            "text": "#F5EAFF",
            "dark": "#28213D",
            "light": "#6B7280",
            "disabled": "#374151",
            "background": "#0F042E",
            "error": "#F6C800"
        },
        "fonts": {
            "families": {
                "primary": "'Space Grotesk', cursive",
                "secondary": "'Helvetica Neue', sans"
            },
            "sizes": {
                "h1": "2.5rem",
                "h2": "2rem",
                "h3": "1.75rem",
                "h4": "1.5rem",
                "h5": "1.25rem",
                "h6": "1rem",
                "body1": "1rem",
                "body2": "0.875rem"
            }
        }
    },
    "content": {
        "backButton": "Back",
        "stepText": "Step",
        "locationTitle": "Location",
        "serviceTitle": "Service",
        "resourceTitle": "Resource",
        "dateTitle": "Date",
        "timeSlotTitle": "Time",
        "metaDataFormTitle": "Your details",
        "metaDataLocationLabel": "Location",
        "metaDataServiceLabel": "Service",
        "metaDataResourceLabel": "Resource",
        "metaDataDateLabel": "Date",
        "metaDataTimeLabel": " Time",
        "metaDataFieldsLabel": "Your details",
        "metaDataSubmitButton": "Confirm booking",
        "completedTitle": "Booking Confirmed",
        "completedMessage": "Thank you for your booking! A confirmation email with all the details has been sent to your inbox."
    }
}
```

#### Settings explanation

**<u>locale</u>**

date-fns locale string List of available languages can be found [here](https://github.com/date-fns/date-fns/blob/9bb51691f201c3ec05ab832acbc5d478f2e5c47a/docs/i18nLocales.md)

```json
"locale": string,
```

**<u>storeExpireTime</u>**

Life span of local storage

```json
"storeExpireTime": integer,
```

**<u>afterBookingExpireTime</u>**

Life span of local storage after a booking is completed

```json
"afterBookingExpireTime": integer,
```

**<u>metaDataFields</u>**

Metadata fields for "Details" view

```json
{
  // Unique field key, will also be used as the key in the API request.
  "uniqueKey": {
    // Field required property: true or false
    "required": boolean,

    // Field type, ex: 'text', 'email', 'tel', 'textarea'
    "type": string,

    // Field width: 'full', 'half', or 'thrid'
    "size": string,

    // Field label and placeholder texts
    "label": string,
    "placeholder": string
  },

  // Add any number of fields here
}
```

## FAQ

**Q: Is Hapio free to use?**<br>
**A:** Hapio does have a free plan with no card details required! [Read more about our pricing here.](https://hapio.io/pricing/)

**Q: If I run into trouble, can I get help?**<br>
**A:** Absolutely! Feel free to reach out to us at [support@hapio.io](mailto:support@hapio.io), and we’ll do our best to assist you.

## Resources

-   [Hapio Website](https://hapio.io/)
-   [Hapio Documentation](https://docs.hapio.io/)
-   [Guide: Get started with Hapio](https://hapio.io/uploads/2024/06/Getting-started-with-Hapio.pdf)

## Contribution

Contributions are welcome!

Please open an issue or submit a pull request for improvements or bug fixes.
Security fixes will be recognized in our [Hapio Hall of Fame](https://hapio.io/hapio-disclosure-program/).
