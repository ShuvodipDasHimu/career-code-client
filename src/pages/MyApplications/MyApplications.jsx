import React, { Suspense } from 'react';
import ApplicationStats from './ApplicationStats';
import ApplicationList from './ApplicationList';
import useAuth from '../../hooks/useAuth';
import { myApplicationsPromise } from '../../api/applicationsApi'; // ✅ Fixed typo

const MyApplications = () => {
    const { user } = useAuth();

    return (
        <div>
            <ApplicationStats />
            <Suspense fallback={'loading your applications'}>
                <ApplicationList
                    myApplicationsPromise={myApplicationsPromise(user.email)}
                />
            </Suspense>
        </div>
    );
};

export default MyApplications;