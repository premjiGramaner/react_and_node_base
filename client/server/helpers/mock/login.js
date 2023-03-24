const loginMock = {
    "cause": "OK",
    "userId": "AAF1ABCyGHPOmXRJZ76VZbJ_G4Gk",
    "token": {
        "base64": "K6WoUw7iQ64_tbNsPBu3rKWub9Vl_SavQ1BhlicgwMutTM9D1HIGgCOmEfqqF-URMUzlPjGD7slJGwj-RcHRQuB3EuW_WfeFN8oGGxHHGG_JSxWNTbjdNWwApM--bx3AkyeiRBFolphrAdxZ1PulK0wRX8S73NOcqyT13PJAZyA=",
        "expires": "1672311399235113341"
    },
    "policies": [],
    "simpleUser": null,
    "detailedUser": {
        "id": "AAF1ABCyGHPOmXRJZ76VZbJ_G4Gk",
        "username": "peter.d@gramenerit.com",
        "SfdcId": "",
        "HubspotId": "",
        "revision": {
            "prev": "",
            "curr": "4",
            "createdAt": "2022-12-01T00:05:17.233114Z",
            "createdBy": "dan@zededa.com",
            "updatedAt": "2022-12-29T06:53:22.891760Z",
            "updatedBy": "admin-gramenerit@zededa.com"
        },
        "state": "USER_STATE_ACTIVE",
        "firstName": "peter.d@gramenerit.com",
        "locale": "",
        "fullName": "peter.d@gramenerit.com d",
        "timeZone": "",
        "roleId": "AAGFABDQsUldQBxEY4Pq8KDDo8uN",
        "type": "AUTH_TYPE_LOCAL",
        "email": "peter.d@gramenerit.com",
        "phone": "",
        "notifyPref": "",
        "LastLoginTime": "2022-12-29T06:53:22.891759Z",
        "LastLogoutTime": "2022-12-28T12:16:26.421008Z",
        "emailState": "ID_STATE_VERIFIED",
        "phoneState": "ID_STATE_UNSPECIFIED",
        "customUserInput": {},
        "allowedEnterprises": [
            {
                "id": "AAFlABC9t6xwVlhL25B0GfMONsK8",
                "name": "Gramenerit",
                "roleId": "AAGFABDQsUldQBxEY4Pq8KDDo8uN"
            }
        ],
        "enterpriseId": "AAFlABC9t6xwVlhL25B0GfMONsK8"
    },
    "realm": null,
    "enterprise": {
        "id": "AAFlABC9t6xwVlhL25B0GfMONsK8",
        "name": "Gramenerit",
        "SfdcId": "",
        "HubspotId": "",
        "state": "ENTERPRISE_STATE_ACTIVE",
        "type": "ENTERPRISE_TYPE_UNSPECIFIED",
        "policyList": {
            "list": []
        },
        "parentEntpId": "AAFlABDe6Nm63ixF5LJBbk9Keqp6",
        "azureSubId": "",
        "title": "Gramenerit",
        "description": "",
        "revision": {
            "prev": "",
            "curr": "1",
            "createdAt": "2022-12-01T00:05:16.976055Z",
            "createdBy": "dan@zededa.com",
            "updatedAt": "2022-12-01T00:05:16.976055Z",
            "updatedBy": "dan@zededa.com"
        },
        "realms": [],
        "attributes": {},
        "inheritAuthFromParent": false,
        "childEnterprises": [],
        "controllerHostURL": "",
        "streamEvents": null
    },
    "role": {
        "id": "AAGFABDQsUldQBxEY4Pq8KDDo8uN",
        "name": "SysAdmin",
        "title": "SysAdmin",
        "description": "",
        "revision": {
            "prev": "",
            "curr": "2",
            "createdAt": "2022-02-04T14:33:16.423963Z",
            "createdBy": "SYSTEM_ROOT",
            "updatedAt": "0001-01-01T00:00:00Z",
            "updatedBy": "SYSTEM_ROOT"
        },
        "type": "USER_ROLE_SYSTEM_DEFINED",
        "state": "ROLE_STATE_ACTIVE",
        "scopes": [
            {
                "accessDevice": "PermissionAccessCreateReadUpdateDelete",
                "accessApp": "PermissionAccessCreateReadUpdateDelete",
                "accessUser": "PermissionAccessCreateReadUpdateDelete",
                "accessStorage": "PermissionAccessCreateReadUpdateDelete",
                "accessEnterprise": "PermissionAccessReadUpdate",
                "enterpriseFilter": [
                    "srOwn"
                ],
                "projectFilter": [
                    "srAll"
                ],
                "accessEdgeApp": "PermissionAccessCreateReadUpdateDelete",
                "accessAppInstance": "PermissionAccessCreateReadUpdateDelete"
            }
        ]
    },
    "noOfLoginAttemptsLeft": 0,
    "redirectUrl": "",
    "loginToken": null,
    "apiToken": null,
    "passwordExpiryTime": "2023-05-30T18:11:45.756781Z",
    "passwordExpiryNotificationPeriodInSeconds": 864000,
    "tempToken": null
};

module.exports = { loginMock }