import React, { useState } from 'react';
import { IntlProvider, FormattedMessage } from 'react-intl';
import { messages } from './message.js';

// Define styles for the layout and buttons
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: 'black',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '300px',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#333',
  },
  paragraph: {
    fontSize: '1rem',
    marginBottom: '20px',
    color: '#555',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    fontSize: '1rem',
    margin: '5px',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  activeButton: {
    backgroundColor: '#28a745', // Green color for active button
  },
};

function InformedFormat() {
  const [locale, setLocale] = useState('en'); // Default locale is English

  // Function to apply active button styles dynamically
  const getButtonStyle = (buttonLocale) => {
    if (locale === buttonLocale) {
      return { ...styles.button, ...styles.activeButton }; // Active button style
    }
    return styles.button; // Normal button style
  };

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.heading}>
            <FormattedMessage id="welcome" />
          </h1>
          <p style={styles.paragraph}>
            <FormattedMessage id="greeting" values={{ name: "Krish" }} />
          </p>
          <button
            style={getButtonStyle('es')}
            onClick={() => setLocale('es')}
          >
            Switch to Spanish
          </button>
          <button
            style={getButtonStyle('en')}
            onClick={() => setLocale('en')}
          >
            Switch to English
          </button>
        </div>
      </div>
    </IntlProvider>
  );
}

export default InformedFormat;
