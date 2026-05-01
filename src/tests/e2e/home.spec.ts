import { expect, test } from "@playwright/test";

test("renders the config-driven user management workflow", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "User orchestration" }),
  ).toBeVisible();

  await page.getByLabel("Name").fill("Maya Patel");
  await page.getByLabel("Email").fill("maya@example.com");
  await page
    .getByLabel("Bio")
    .fill("Owns operations for config-driven launches.");
  await page.getByRole("button", { name: "Create user" }).click();

  await expect(page.getByRole("cell", { name: "Maya Patel" })).toBeVisible();
  await expect(page.getByText("users.create")).toBeVisible();
});
