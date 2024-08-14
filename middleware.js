import { NextResponse } from 'next/server'
import Cookiechecker from './app/DatabaseAndFetching/Forverification/Auth'

export async function middleware(request) {
    // console.log("Middleware ", request.nextUrl.pathname)
    // console.log("this is a request",request)
    const token = request.cookies.get("Login Token")?.value
    // console.log(token)
    // const isPreRendering = request.headers.get('x-prerender-revalidate');
    let isPreRendering ;
    console.log("this is prerendering", isPreRendering)
    // console.log("Testing the Logic",process.env.NODE_ENV === 'production' ? (isPreRendering && request.nextUrl.pathname === "/Api/Logout"):request.nextUrl.pathname === "/Api/Logout")
    // console.log("Pre-rendering" ,isPreRendering)
    // console.log("Variables of logic",process.env.NODE_ENV === 'production',isPreRendering,request.nextUrl.pathname === "/Api/Logout")
    const isAccessingAuthPages = ["/Login", "/Signup"].includes(request.nextUrl.pathname)
    const isAccessingApiPages = ["/Api/Login", "/Api/User"].includes(request.nextUrl.pathname)
    const isApiRoute = request.nextUrl.pathname.startsWith("/Api")
    const isAdminApiRoute = request.nextUrl.pathname.startsWith("/Api/User/Admin/")
    const isAppointmentApiRoute = request.nextUrl.pathname.startsWith("/Api/Appointments")
    const roleBasedRoutes = {
        "/Api/User/Admin": ["admin"],
        "/Api/User/Admin/Data": ["admin"],
        "/Api/User": ["admin", "doctor", "patient"],
        "/Api/User/Doctor": ["doctor"],
        "/Api/User/Patient": ["patient"],
        "/Api/User/Profile": ["admin", "doctor", "patient"],
        "/Api/Login": ["admin", "doctor", "patient"]
    }
    const isUserRoute = /^\/api\/user\/[a-zA-Z0-9]+$/.test(request.nextUrl.pathname.toLowerCase());
    // console.log("dynamic", isUserRoute)
    const requiredRoles = roleBasedRoutes[request.nextUrl.pathname]
    const requestedMethod = request.method

    // If token is available
    if (token) {
        if (isAppointmentApiRoute || request.nextUrl.pathname === "/Api/Searched") {
            return NextResponse.next();
        }
        // For Pages
        if (isAccessingAuthPages) {
            // console.log("Trying to Login or Sign up even when Logged in")
            return NextResponse.redirect(new URL('/', request.url))
        }
        if (request.nextUrl.pathname === "/Account/Profile") {
            isPreRendering = false
          
            // console.log("It is ok to go to the Account page When Logged in")
            console.log("this is prerendering", isPreRendering)
            return NextResponse.next()
        }

        // For logging out
        if (request.nextUrl.pathname === "/Api/Logout") {
            // isPreRendering = false
            const response = NextResponse.redirect(new URL('/', request.url))
            // console.log(response)
            if (process.env.NODE_ENV === 'production' && isPreRendering !== undefined) {
                console.log("Logging out 1")
                response.cookies.set('Login Token', '', { maxAge: 0, path: '/' })
            } else if (process.env.NODE_ENV !== 'production') {
                console.log("Logging out 2")
                response.cookies.set('Login Token', '', { maxAge: 0, path: '/' })
            }

            // response.cookies.set('Login Token', '', {
            //     httpOnly: true,
            //     secure: process.env.NODE_ENV === 'production',
            //     path: '/',
            //     // domain: '.health-medica.vercel.app',
            //     maxAge: 0,
            //     // sameSite: 'Lax', 
            // });
            // response.headers.set('Cache-Control', 'no-store')

            return response
        }

        // For API Routes
        if (isApiRoute) {
            // console.log("API routes for Logged in user")
            const user = await Cookiechecker(token)
            if (user !== null) {
                // console.log(`Roles ${user.as} allowed -`, requiredRoles?.includes(user.as))
                // console.log("Checking for the valid user token...")
                // console.log(user.as === "admin", isAdminApiRoute)
                // console.log(request.nextUrl.pathname.split("/")[request.nextUrl.pathname.split("/").length - 1])
                if (isUserRoute && user.userId === request.nextUrl.pathname.split("/")[request.nextUrl.pathname.split("/").length - 1]) {
                    // console.log("Sirf main hi apna details badal sakta hu")
                    return NextResponse.next();
                }
                if (isUserRoute && requestedMethod === "GET" && user.as === "admin") {
                    return NextResponse.next();
                }
                if (isAdminApiRoute && user.as === "admin") {
                    // console.log("You can change this field")
                    return NextResponse.next();
                }
                if (requiredRoles?.includes(user.as) && requestedMethod === "GET") {
                    // console.log("Role based verification done Successfully - You are allowed to look inside")
                    return NextResponse.next();
                }
                if (request.nextUrl.pathname === "/Api/Login") {
                    // console.log("Logging in with more than one account at one time is currently not availabe")
                    return NextResponse.json({ message: 'Logging in with more than one account at one time is currently not availabe', success: false });
                }
                if (requiredRoles?.includes(user.as) && request.nextUrl.pathname === "/Api/User/Doctor" || request.nextUrl.pathname === "/Api/User/Patient") {
                    return NextResponse.next();
                }

                // console.log("you're not allowed to use - ", request.nextUrl.pathname, "- with -", requestedMethod, "- method")
                return NextResponse.json({ message: `You must be logged in, as ${requiredRoles} to be able to access this Url`, success: false });
            }
        }
    }

    // If token is not available
    else {

        // For Pages
        if (request.nextUrl.pathname === "/Account/Profile") {
            // console.log("Trynig to see account without Login")
            return NextResponse.redirect(new URL('/', request.url))
        }
        if (isAccessingAuthPages) {
            // console.log("Trynig to Login")
            return NextResponse.next();
        }
        // For logging out
        if (request.nextUrl.pathname === "/Api/Logout") {
            // console.log("Logging out even when not logged in")
            return NextResponse.redirect(new URL('/', request.url))
        }

        // For API Routes
        if (isAccessingApiPages && requestedMethod === 'POST') {
            // console.log("Post method is allowed for Login And Sign up Page")
            return NextResponse.next();
        }

        // For Appointment Routes
        if (isAppointmentApiRoute || request.nextUrl.pathname === "/Api/Searched") {
            return NextResponse.next();
        }
    }

}

export const config = {
    matcher: ["/Api/:path*", "/Login", "/Signup", "/Account/:path*"]
}


// console.log("Unauthorized",request.method)
// console.log('token:',!token,'isAccessingApiPages:', !isAccessingApiPages, 'method:',  request.method === "GET")
// console.log("Authorized",request.method)