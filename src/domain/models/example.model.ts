export class ExampleModel {
    private _description: string;  
   
    
    constructor(description: string){
        this._description = description;
    }

    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }


    verify(): boolean{
        if(!this.description){
            return false;
        }

        return true;
    }
}