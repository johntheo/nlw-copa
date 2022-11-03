- For getting the autocomplete from prisma on VSCode we had to add this in the `settings.json`
```
// =================== CONFIG: prisma ===================
  "[prisma]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "Prisma.prisma"
  },
```
- A seed is the mocked data for testing the application atthe beggining. After creating a seed on prisma, you need to add the confi in the `package.json`
```
"prisma":{
    "seed": "tsx prisma/seed.ts"
  },
```
and after in the CLI: `npx prisma db seed`
- You can run `npx prisma studio` to check and alter the data in db
- Zod is a good library for schema validation `npm i zod`
