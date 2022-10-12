# User stories

These are the user stories defined to ensure that the application works as required in this project:

## Authentication

```script
Feature: Create an account  
  Background: As a new user, I want to register with the to-do app
    Given I do not have an account
 
Scenario: As a user, I want to create an account
  When I visit the signup page
  And I set the email to "test@example.co.uk"
  And I set a password to "****"
  And I set confirmPassword to "****"
  And I click the register button
  Then I expect to be shown a warning that instructs me to confirm my email address by clicking a link in an email
  And I click the link provided in the email
  Then I expect to be logged in to the app 
  And I expect to see the home screen
```

```script
Feature: Log in to the app
  Background: As a user, I want to log in to the to-do app
    Given I already have an account
 
Scenario: As a user, I want to log in to the app
  When I visit the login page
  And I enter my email as "test@example.co.uk"
  And I enter my password as "****"
  And I click the Log In button
  Then I expect to be logged in to the app 
  And I expect to see the home screen
```

```script
Feature: Log out from the app
  Background: As a user, I want to be able to log out from the app
    Given I am logged in to the app
 
Scenario: As a user, I want to log out
  When I am viewing the home screen
  And I click the log out button 
  Then I expect to be logged out of the app
  And I expect to see the login page
```

## App

```script
Feature: Add a new task
  Background: As a logged in user, I want to add a new task and have it appear on my to-do list
    Given I am logged in
 
Scenario: As a logged-in user I want to create a new task
  When I visit the home screen
  And I enter "My cool task" in the NewTask field
  And I click the submit button
  Then I expect to see "My cool task" in the To-Do list of tasks
```

```script
Feature: Edit a task
  Background: As a logged in user, I want to edit an existing task and have the app display the updated content
    Given I have already created a task
 
Scenario: As a user, I want to edit the title of my task
  When I locate the task I'd like to edit
  And I click the corresponding Edit button to the task
  Then I expect the title of the task to become editable
  When I enter a new description for the task
  And I click submit
  Then I expect to see my updated task on the To-Do list
```

```script
Feature: Mark a task as complete
  Background: As a logged in user, I want to be able to mark a task as complete and automatically move it to the completed section 
    Given I have already created a task
 
Scenario: As a logged-in user I want to mark a task as complete
  When I locate the task I'd like to mark as complete
  And I click the corresponding done button to the task
  Then I expect to see that my task has immediately been moved to the completed section
```

```script
Feature: Mark a task as incomplete
  Background: As a logged in user, I want to be able to mark a task as incomplete and automatically move it back to the to-do section 
    Given I have already created a task and marked it as complete
 
Scenario: As a logged-in user I want to mark a task as incomplete
  When I locate the task I'd like to mark it as incomplete
  And I click the corresponding incomplete button to the task
  Then I expect to see that my task has immediately been moved to the to-do section
```

```script
Feature: Delete a task
  Background: As a logged in user, I want to be able to permanently delete an existing task
    Given I have already created a task
 
Scenario: As a logged-in user I want to delete a task
  When I locate the task I'd like to delete
  And I click the corresponding delete button to the task
  Then I expect to see that my task has been permanently removed from every list
```
