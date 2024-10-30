# Cambio Website
Webstie based on [Figma](https://www.figma.com/design/ZEELu7pfjIC5qBCQJChrRy/Cambio?node-id=0-1&m=dev&t=I1lLTecdVwJ1eQm9-1)

## Quick setup

Use `npm start` to start.
Please refer to [React PDF](https://github.com/wojtekmaj/react-pdf) to install related packages.

## Structure

    |-- public/
    |-- src/
    |-- Components/
    |   |-- Header.tsx              # Header component used across the app
    |   |-- SubHeader.tsx           # SubHeader component for secondary navigation
    |   |-- FileUploader.tsx        # Component for uploading files
    |   |-- ExtractFullContent/     # Folder containing components related to full content extraction
    |   |-- ExtractTables/          # Folder containing components for table extraction
    |   |-- ExtractKeyValuePairs/   # Folder containing components for key-value pair extractio
    |-- App.tsx                     # Main component that includes main layout
    |-- ChooseCategory.tsx          # Main component that includes main layout #2
    |-- DocumentParsing.tsx         # Main component that includes main layout #3
    |-- index.tsx                   # Entry point for the React application and Routes
