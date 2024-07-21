export class Car {

constructor(make, color, name){
    this._make = make;
    this._color = color;
    this._name = name;
}
    describeVehicle(){
        const carString = "Your car is a " + this._color + " " + this._make + " named " + this._name + ".";
        console.log(carString);
    }

    sum(a , b){
        return a + b;
    }

}
