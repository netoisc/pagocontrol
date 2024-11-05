import { Authenticator, ThemeProvider, translations } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from "aws-amplify";
import { I18n } from 'aws-amplify/utils';
import React from "react";
import ReactDOM from "react-dom/client";
import outputs from "../amplify_outputs.json";
import App from "./App.tsx";
import "./index.css";


Amplify.configure(outputs);

I18n.putVocabularies(translations);
I18n.setLanguage("es");
I18n.putVocabularies({
  es: {
    'Email': 'Correo electrónico',
    'Phone Number': 'Teléfono',
    'Given Name': "Nombre",
    'Family Name': "Apellidos",
    'Please confirm your Password': 'Escriba de nuevo su contraseña',
    'Enter your Given Name': 'Escriba su nombre(s)',
    'Enter your Family Name':'Apellido Paterno',
  },
});


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Authenticator>
        <App />
      </Authenticator>
    </ThemeProvider>
  </React.StrictMode>
);
