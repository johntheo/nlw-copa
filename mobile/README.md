- Resource of components: https://nativebase.io/ 
- Due new npm lts and an yet unsupportive expo, it was needed to add this to `package.json`
```
    "overrides": {
        "react": "18.0.0"
    },
```
- Installing fonts
```
    npx expo install expo-font @expo-google-fonts/roboto
```

## Lesson 3 - https://axiomatic-basin-551.notion.site/Aula-3-2582f2b626ee468fb34c497eb6d0b982
- For discovering the OAuthURI `console.log(AuthSession.makeRedirectUri({useProxy: true}))`