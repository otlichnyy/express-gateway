import express from 'express';
import { hasuraProxyController } from '@src/controllers';

const router = express.Router();

router.route('/').post(hasuraProxyController.hasuraProxyCall);

export default router;

// this will be a service
// async function fetchGraphQL(operationsDoc, variables) {
//   const result = await fetch(
//     "undefined",
//     {
//       method: "POST",
//       body: JSON.stringify({
//         query: operationsDoc,
//         variables: variables,
//       })
//     }
//   );

//   return await result.json();
// }

// const operationsDoc = `
//   # Consider giving this query a unique, descriptive
//   # name in your application as a best practice
//   query unnamedQuery1 {
//     user {
//       id
//       email
//     }
//   }
// `;

// function fetchUnnamedQuery1() {
//   return fetchGraphQL(
//     operationsDoc,
//     "unnamedQuery1",
//     {}
//   );
// }

// --- consumer code, inside route function
// router.route('/').post(hasuraProxyController.executeGraphQL);

// consumed inside controller
// async function startFetchUnnamedQuery1() {
//   const { errors, data } = await fetchUnnamedQuery1();

//   if (errors) {
//     // handle those errors like a pro
//     console.error(errors);
//   }

//   // do something great with this precious data
//   console.log(data);
// }

// startFetchUnnamedQuery1();
