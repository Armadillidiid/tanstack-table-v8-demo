import { faker } from "@faker-js/faker";
import { jobItem } from "../hooks/types";


export const generateRandomJobItem = () => ({
  id: faker.number.int(),
  position: faker.person.jobTitle(),
  industry: faker.commerce.department(),
  team: faker.company.name(),
  location: faker.location.city(),
  job_type: faker.helpers.arrayElement(["Full-time", "Part-time", "Contract"]),
  date_posted: faker.date.recent().toISOString(),
});

export const generateJobItems = (n: number) => {
  const jobItems = [];
  for (let i = 0; i < n; i++) {
    const fakeJobItem = generateRandomJobItem();
    try {
      jobItem.parse(fakeJobItem);
      jobItems.push(fakeJobItem);
    } catch (error) {
      console.error(
        `Generated invalid job item: ${JSON.stringify(fakeJobItem)}`,
      );
      console.error(error);
    }
  }
  return jobItems;
};
