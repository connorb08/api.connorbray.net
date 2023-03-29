import { CRouter } from "./CRouter/CRouter";

export interface Env {}

const router = new CRouter();

router.all('/', (req, res, {next}) : Response | void => {
    console.log(`Request found, method: ${req.method}`);
    const path = new URL(req.url).pathname
    if (path === "/" || path === "/api/") {
        return res.send(JSON.stringify({message: "Site is connected to the API Worker!"}));
    }
    next()
})

router.get('/cfinfo', (req, res, {next}) : Response | void => {
    const data : {} = {
        ...req.cf
    }
    return res.send(JSON.stringify({
        data
    }))
})

router.get('/ghinfo', (req, res, {next}) : Response | void => {
    const data : {} = {
        ...req.cf
    }
    return res.send(JSON.stringify({
        data
    }))
})

// Error catcher
router.all('/', (req, res, {next}) : Response | void => {
    return res.status(404).send('not found')
})

export default {
	async fetch(
        request: Request,
        env: Env,
        ctx: ExecutionContext
    ): Promise<Response> {
        const response = router.handle(request, {env, ctx});
        return response;
    },
};
