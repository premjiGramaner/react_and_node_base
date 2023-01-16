import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { IDefaultPageProps, IReducerState } from '@Utils/interface';
import { URLS } from '@Utils/constants';
import { IS_USER_AUTHENTICATED } from '@Utils/storage';
import { fetchUsers, updateUser, deleteUser } from "@Reducers/index";


const DashboardComponent: React.FC<IDefaultPageProps> = (props) => {
    const [usersList, setusersList] = useState<{
        name: string;
        id: number;
    }[]>([]);
    const [name, setName] = useState<string>("")

    const { userList, usersLoading } = useSelector((state: IReducerState) => state.coreReducer)

    useEffect(() => {
        if (!IS_USER_AUTHENTICATED()) {
            props.navigate(URLS.LOGIN)
        }
        props.dispatch(fetchUsers())
    }, [])

    useEffect(() => {
        if (!usersLoading && userList.length) {
            setusersList(userList);
        }
    }, [usersLoading])

    const onLogout = () => {
        IS_USER_AUTHENTICATED("false");
        props.navigate(URLS.LOGIN)
    }

    const onSave = async (item: any) => {
        await updateUser(item);
        props.dispatch(fetchUsers())
    }

    const onDelete = async (id: any) => {
        await deleteUser(id);
        props.dispatch(fetchUsers())
    }

    return (
        <div className='dashboard-page-main-container'>
            <div className='sample-header'>
                <h3>Dashboard Component</h3>
                <button className='btn btn-primary' onClick={onLogout}>Logout</button>
            </div>
            <div>
                name: <input name="name-input" value={name} onChange={({ target }) => setName(target.value)} />
                <button onClick={() => onSave({ name })} disabled={name.length < 3}>Save</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {usersList.map((item, index) => {
                        return (
                            <tr key={item.name + item.id}>
                                <td>{item.id}</td>
                                <td><input name={item.id + '1'} value={item.name} onChange={({ target }) => {
                                    const mockUsers = JSON.parse(JSON.stringify(usersList));
                                    mockUsers[index]["name"] = target.value;
                                    setusersList(mockUsers);
                                }} /></td>
                                <td>
                                    <button onClick={() => onSave(item)}>Save</button>
                                    <button onClick={() => onDelete(item.id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>

            </table>
        </div>
    )
};

export default DashboardComponent;