import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  PaymentFrequency: a.enum(['ANNUALLY','MONTHLY', 'WEEKLY']),

  PaymentConcept: a
    .model({
      name: a.string().required(),
      amount: a.float().required(),
      frequency: a.ref('PaymentFrequency'),
      startDate: a.date().required(),
      toleranceDays: a.integer(),
      organizationId: a.id(),
      organization: a.belongsTo('Organization', 'organizationId')
    })
  .authorization((allow)=> [allow.owner()]),
  OrganizationPeople: a
    .model({
      organizationId: a.id().required(),
      personId: a.id().required(),
      organization: a.belongsTo('Organization', 'organizationId'),
      person: a.belongsTo('Person', 'personId'),
      createdAt: a.datetime(),
  })
  .authorization((allow)=> [allow.authenticated()]),
  Organization: a
    .model({
      name: a.string().required(),
      address: a.string().required(),
      concepts: a.hasMany('PaymentConcept', 'organizationId'),
      persons: a.hasMany('OrganizationPeople', 'organizationId'),
      type: a.enum(['COMPANY', 'SCHOOL', 'OTHER']),
    })
    .authorization((allow)=> [allow.owner()]),
  Person: a
    .model({
      fullname: a.string().required(),
      payDay: a.integer(),
      email: a.email(),
      phoneNumber: a.phone(),
      active: a.boolean().default(true),
      organizations: a.hasMany('OrganizationPeople', 'personId')
    })
    .authorization((allow)=> [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
