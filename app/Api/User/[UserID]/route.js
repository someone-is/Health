import { User } from "@/app/DatabaseAndFetching/Models/User";
import { NextResponse } from "next/server";
import ConnectDatabase from "../../Connections/ConnectDatabase";

// To get a Users
export async function GET(request, { params }) {
    ConnectDatabase();
    const { UserID } = params;

    try {
        const finduser = await User.findOne({ userId: UserID }) || await User.findOne({ name: UserID }) || await User.findById(UserID)

        return NextResponse.json({ User: finduser, status: true });

    } catch (error) {
        return NextResponse.json({ message: "User Not Found", status: false })
    }
}

// To Delete a User
export async function DELETE(request, { params }) {
    ConnectDatabase();
    const { UserID } = params;
    try {
        // console.log({result:"this is params",UserID})
        // const finduser = await User.findById(UserID)
        const newuserdel = await User.deleteOne({ _id: UserID })
        if (newuserdel.deletedCount === 0) {
            new Error(code = undefined)
        }
        else {
            return NextResponse.json({ result: "User Deleted", ID: UserID, newuserdel, status: true });
        }

    } catch (error) {
        let errorMessage = "Couldn't delete the user"

        if (error.code === undefined) {
            errorMessage = "The user you are trying to delete doesn't exists"
        }
        return NextResponse.json({ message: errorMessage, status: false })
    }
}

// To Edit a User
export async function PUT(request, { params }) {
    ConnectDatabase();
    const { UserID } = params;
    const { userId, name, password, as } = await request.json();
    try {
        const finduser = await User.findById(UserID);
        if (userId !== undefined) {
            finduser.userId = userId;
        }

        finduser.name = name;

        if (password !== undefined) {
            finduser.password = password;
        }

        if (as !== undefined) {
            finduser.as = as;
        }

        // if (finduser.as === "admin") {
        // finduser.as = as;
        // }

        const updatedUser = await finduser.save();
        return NextResponse.json({ result: "User Successfully Updated", updatedUser, status: true })

    } catch (error) {
        return NextResponse.json({ message: "Couldn't Update the details", status: false })
    }
}
