import { CResponse } from "./CResponse"

interface RouteHandler {
    path: string,
    method: string,
    handler: (req : Request, res : CResponse, next: (data?: any) => Response | void) => Response | void,
}

export class CRouter {

    private routeArray: RouteHandler[] = [];

    public all = (path: string, handler: (req : Request, res : CResponse, next: (data?: any) => Response | void) => Response | void) => {
        this.routeArray.push({path, method: '*', handler});
    }

    public get = (path: string, handler: (req : Request, res : CResponse, next: (data?: any) => Response | void) => Response | void) => {
        this.routeArray.push({path, method: 'GET', handler});
    }

    public handle = (req: Request) : Response => {

        const req_path = new URL(req.url).pathname
        const res = new CResponse();

        const matched_nodes = this.routeArray.filter(({path, method}) => {
            if (method.match(req.method) || method === "*") {
                return req_path.match(path);
            }
            else return false;
        })

        for (const node of matched_nodes) {
            
            const r = node.handler(req, res, () => undefined);
            
            // Return if response is returned, else pass to next handler
            if (r !== undefined) {
                return r;
            }
            else {
                continue;
            }
        }

        throw Error("Error: request fell through")
    }

}
