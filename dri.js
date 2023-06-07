// Singleton Pattern
class DrinkSystem {
    constructor() {
        if (DrinkSystem.instance) {
            return DrinkSystem.instance;
        }
        this.drinks = [];
        DrinkSystem.instance = this;
        return this;
    }

    addDrink(drink) {
        this.drinks.push(drink);
    }

    deleteDrink(drinkName) {
        this.drinks = this.drinks.filter(drink => drink.name !== drinkName);
    }

    sortByCategory(category) {
        const sortedDrinks = this.drinks.filter(drink => drink.category === category);
        sortedDrinks.sort((a, b) => a.name.localeCompare(b.name));
        return sortedDrinks;
    }
}

// Prototype Pattern
class Drink {
    constructor(name, category) {
        this.name = name;
        this.category = category;
    }

    clone() {
        return new Drink(this.name, this.category);
    }
}

// Builder Pattern
class DrinkBuilder {
    constructor() {
        this.name = '';
        this.category = '';
    }

    setName(name) {
        this.name = name;
        return this;
    }

    setCategory(category) {
        this.category = category;
        return this;
    }

    build() {
        return new Drink(this.name, this.category);
    }
}

// Facade Pattern
class DrinkFacade {
    constructor() {
        this.drinkSystem = new DrinkSystem();
    }

    addDrink(name, category) {
        const drink = new DrinkBuilder()
            .setName(name)
            .setCategory(category)
            .build();

        this.drinkSystem.addDrink(drink);
        console.log(`Drink "${name}" added to the system.`);
    }

    deleteDrink(name) {
        this.drinkSystem.deleteDrink(name);
        console.log(`Drink "${name}" deleted from the system.`);
    }

    sortDrinksByCategory(category) {
        const sortedDrinks = this.drinkSystem.sortByCategory(category);
        console.log(`Sorted Drinks (Category: ${category}):`);
        sortedDrinks.forEach(drink => console.log(drink.name));
    }
}

// Decorator Pattern
class DrinkWithPrice {
    constructor(drink, price) {
        this.drink = drink;
        this.price = price;
    }

    getName() {
        return this.drink.name;
    }

    getCategory() {
        return this.drink.category;
    }

    getPrice() {
        return this.price;
    }
}

// Iterator Pattern
class DrinkIterator {
    constructor(drinks) {
        this.drinks = drinks;
        this.index = 0;
    }

    hasNext() {
        return this.index < this.drinks.length;
    }

    next() {
        if (this.hasNext()) {
            const drink = this.drinks[this.index];
            this.index++;
            return drink;
        }
        return null;
    }
}

const readline = require('readline');

// Create an interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Usage
const drinkFacade = new DrinkFacade();

function addDrink() {
    rl.question('Enter the name of the drink: ', name => {
        rl.question('Enter the category of the drink: ', category => {
            drinkFacade.addDrink(name, category);
            rl.close();
        });
    });
}

function deleteDrink() {
    rl.question('Enter the name of the drink to delete: ', name => {
        drinkFacade.deleteDrink(name);
        rl.close();
    });
}

function sortDrinksByCategory() {
    rl.question('Enter the category to sort drinks: ', category => {
        drinkFacade.sortDrinksByCategory(category);
        rl.close();
    });
}

function promptUserAction() {
    console.log(' Bun venit pe acest sistem de gestionare a bauturilor! ');
    console.log('       Menu    ');
    console.log('1. Add Drink');
    console.log('2. Delete Drink');
    console.log('3. Sort Drinks by Category');
    console.log('4. Exit');
    rl.question('Enter your choice: ', choice => {
        switch (choice) {
            case '1':
                addDrink();
                break;
            case '2':
                deleteDrink();
                break;
            case '3':
                sortDrinksByCategory();
                break;
            case '4':
                rl.close();
                break;
            default:
                console.log('Invalid choice. Please try again.');
                promptUserAction();
                break;
        }
    });
}

promptUserAction();
