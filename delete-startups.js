// delete-startups.js
const { createClient } = require("@sanity/client");

const client = createClient({
  projectId: "oento1ls", // ваш Project ID
  dataset: "production", // ваш dataset
  token:
    "skvAnnGgnJ3CzUzQdC1LPdipGZLFFeu7BXVqXlJI7HXacgqXr39FXnp6sGxJtmALB0nQj4vsObWiL8P3NO3yi9mX65cMl8ftT4V5DacM886kr1RA3MtVDDZmnBHHzVzX4zcBvOf21S4pWObyKe32q2YPpTuACwiJSsrzXqq6w2bZKd4MwfGA", // замените на ваш SANITY_WRITE_TOKEN из .env
  apiVersion: "2024-10-30", // или актуальная дата версии API
  useCdn: false,
});

async function deleteStartups() {
  const docs = await client.fetch('*[_type == "startup"]{_id}');
  if (docs.length === 0) {
    console.log("No startup documents found.");
    return;
  }
  for (const doc of docs) {
    await client.delete(doc._id);
    console.log(`Deleted ${doc._id}`);
  }
  console.log("All startup documents deleted!");
}

deleteStartups().catch((err) => {
  console.error("Error deleting startups:", err);
});
