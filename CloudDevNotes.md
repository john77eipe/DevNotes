# AWS

## Downloading objects in S3 that was shared from another account using roles

How do you access the objects in S3 from your account using the role that was given to you.

So, assume there is account A and a (third party or client managed) account B

In the following examples, you grant access to users in another AWS account (Account B) so that users can manage objects that are in an S3 bucket owned by your account (Account A).

Use one of the following methods to grant cross-account access to objects that are stored in S3 buckets:

1. **Resource-based policies and AWS Identity and Access Management (IAM) policies** for programmatic-only access to S3 bucket objects

2. **Resource-based Access Control List (ACL) and IAM policies** for programmatic-only access to S3 bucket objects

3. **Cross-account IAM roles** for programmatic and console access to S3 bucket objects





**Steps for account A:**

I'm not sure the difference between 1 and 2, but here I'm gonna do option 3. 

Account a does the steps outlines for  Cross-account IAM role provided: https://aws.amazon.com/premiumsupport/knowledge-center/cross-account-access-s3/

Using cross-account IAM roles simplifies provisioning cross-account access to S3 objects that are stored in multiple S3 buckets, removing the need to manage multiple policies for S3 buckets. 

**Steps for account B:**

Since option 3 used by Account A provides console and cli access,

- Account B can do the following on the console to switch to the role provided by account A.

https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-console.html

- Account B can do the following on the cli to switch to the role provided by account A.

https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-cli.html



There is one more way you can do it,

1. Create Access Key/Token

2. Bring up a EC2 instance

3. Perform `aws configure`

4. Perform `aws sts assume-role --role-arn arn:aws:iam::AccountIDofAccountB:role/RoleName --role-session-name "RoleSession1"` 
   More here: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp_use-resources.html

5. The above command will output all the details including session token

   ```curl
   $export AWS_ACCESS_KEY_ID=AKIAI44QH8DHBEXAMPLE
   $export AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
   $export AWS_SESSION_TOKEN=AQoDYXdzEJr.....<remainder of security token>
   ```

6. Perform the required command, say, 
   `aws s3 cp s3://mybucket . --recursive`



## Life hack to download files from s3 bucket from the browser

```javascript
(function() {
    const rows = Array.from(document.querySelectorAll('.fix-width-table tbody tr'));
    const downloadButton = document.querySelector('[data-e2e-id="button-download"]');
    const timeBetweenClicks = 500;
    function downloadFiles(remaining) {
        if (!remaining.length) {
            return
        }
        const row = remaining[0];
        row.click();
        downloadButton.click();
        setTimeout(() => {
            downloadFiles(remaining.slice(1));
        }, timeBetweenClicks)
    }
    downloadFiles(rows)
}())
```

