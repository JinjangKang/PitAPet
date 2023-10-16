class Animal {
    constructor(public name) {}

    makeSound() {
        console.log('Some generic sound');
    }
}

class Dog extends Animal {
    constructor(name, public breed) {
        super(name); // 부모 클래스의 생성자 호출
    }

    makeSound() {
        console.log('Woof! Woof!');
        super.makeSound(); // 부모 클래스의 메서드 호출
    }
}

const myDog = new Dog('Buddy', 'Golden Retriever');
console.log(myDog.name); // Buddy
console.log(myDog.breed); // Golden Retriever
myDog.makeSound();
