import { CardCategory } from "./enum"
class CardFactory {
    private type:CardCategory
    private name:string
    constructor(type:CardCategory,name:string) {
        this.type = type
        this.name = name
    }
    public getType() :CardCategory {
        return this.type
    }
    public getName() :string {
        return this.name
    }
}

export class SceneCard extends CardFactory{
    private description:string
    constructor(type:CardCategory,name:string,description:string){
        super(type,name)
        this.description = description
    }
    public getDescription () :string {
        return this.description
    }
}
