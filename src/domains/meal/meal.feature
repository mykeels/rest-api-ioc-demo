Feature: Meal
    Description: A meal is a collection of ingredients, cooked with a recipe

    # Specifications generated by ChatGPT
    # prompt:
    # write gherkin syntax for creating, retrieving a list of,
    # updating and deleting a meal,
    # considering a meal can contain one or more ingredients

    Scenario: Create a meal
        Given a meal with name "Spaghetti Bolognese" and ingredients "spaghetti, tomato sauce, minced meat"
        When I create the meal
        Then the meal is created

    Scenario: Retrieve a list of meals
        Given a meal with name "Spaghetti Bolognese" and ingredients "spaghetti, tomato sauce, minced meat"
        And a meal with name "Pizza" and ingredients "dough, tomato sauce, cheese"
        When I retrieve the list of meals
        Then the list of meals contains "Spaghetti Bolognese"
        And the list of meals contains "Pizza"

    Scenario: Update a meal
        Given a meal with name "Spaghetti Bolognese" and ingredients "spaghetti, tomato sauce, minced meat"
        When I update the meal with name "Spaghetti Bolognese" and ingredients "spaghetti, tomato sauce, minced meat, parmesan"
        Then the meal is updated

    Scenario: Delete a meal
        Given a meal with name "Spaghetti Bolognese" and ingredients "spaghetti, tomato sauce, minced meat"
        When I delete the meal with name "Spaghetti Bolognese"
        Then the meal is deleted
