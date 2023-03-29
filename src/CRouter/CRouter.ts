import { Env } from "..";
import { CResponse } from "./CResponse"

export type NextHandler = (data?: any) => Response | void
export type CRouterHandler = (req : Request, res : CResponse, {env, ctx, next}: {env: Env, ctx: ExecutionContext, next: NextHandler}) => Response | void

interface RouteHandler {
    path: string,
    method: string,
    handler: CRouterHandler
}
export class CRouter {

    private routeArray: RouteHandler[] = [];

    public all = (path: string, handler: CRouterHandler) => {
        this.routeArray.push({path, method: '*', handler});
    }

    public get = (path: string, handler: CRouterHandler) => {
        this.routeArray.push({path, method: 'GET', handler});
    }

    public handle = (req: Request, {env, ctx} : {env: Env, ctx: ExecutionContext}) : Response => {

        const req_path = new URL(req.url).pathname
        const res = new CResponse();

        const matched_nodes = this.routeArray.filter(({path, method}) => {
            if (method.match(req.method) || method === "*") {
                return req_path.match(path);
            }
            else return false;
        })

        for (const node of matched_nodes) {

            const n: NextHandler = (data?: any) => {console.log(data)}
            const r = node.handler(req, res, {env, ctx, next: n});
            
            // Return if response is returned, else pass to next handler
            if (r !== undefined) {
                return r;
            }
            else {
                continue;
            }
        }

        throw Error("Error: request fell through router")
    }

}
