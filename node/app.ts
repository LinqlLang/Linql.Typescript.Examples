
import { State } from "./DataModel.js";
import { ALinqlSearch, LinqlContext, LinqlSearch } from "linql.client";

class LinqlNodeExample {
    context = new CustomLinqlContext(LinqlSearch, "https://localhost:7113", { this: this });


    async Run() {
        console.log('hello');

        const states = this.context.Set<State>(State);
        const firstState = await states.FirstOrDefaultAsync();
        console.log(firstState.State_Name);
    }

}

export async function Main(): Promise<any> {
    const example = new LinqlNodeExample();
    await example.Run();

}

class CustomLinqlContext extends LinqlContext {
    protected override GetRoute<T>(Search: ALinqlSearch<T>) {
        let endPoint: string;
        if (typeof Search.ModelType === "string") {
            endPoint = Search.ModelType;
        }
        else {
            endPoint = Search.ModelType.name;
        }

        return `${endPoint}`

    }
}