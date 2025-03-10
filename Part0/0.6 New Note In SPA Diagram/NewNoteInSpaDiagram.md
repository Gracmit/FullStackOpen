```mermaid
sequenceDiagram

    participant browser
    participant server

    browser->>server: Post https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note left of server: Note gets saved to server

    server-->>browser: {"message":"note created"}
    deactivate server
```
