# Day 01 - S3 Bucket

- Create a folder `day01-s3` and change working directory to `day01-s3`

    ```bash
    mkdir day01-s3
    cd day01-s3
    ```

- The AWS CDK project template uses the directory name to name things in the generated code. You will have to adapt if you use a different folder name. Now you will initialize the CDK project, and this example uses TypeScript.
  
    ```bash
    cdk init app --language=typescript
    ```

- After the above command finishes running it will create a directory structure as below:
  
    ```bash
    .
    ├── README.md
    ├── bin
    ├── cdk.json
    ├── jest.config.js
    ├── lib
    ├── node_modules
    ├── package-lock.json
    ├── package.json
    ├── test
    └── tsconfig.json
    ```

- The CDK app is in the `bin` folder in this case with the filename: `day01-s3.ts`. This file has the stacks associated with this app.

- The `lib` folder has the stack file and since AWS CDK uses the directory name things - the file name is `day01-s3-stack.ts`.

- Run the `build` command:

    ```bash
    npm run build
    ```

- And after the `build` command list the stack:

    ```bash
    cdk ls
    ```

- And you should see the name of the stack printed on the terminal as output:

    ```bash
    Day01S3Stack
    ```

- Let's get started in creating the S3 bucket. First to install the `npm` package for S3. If your `cdk --version` is the same as the latest, then you can skip specifying the CDK version when you install AWS CDK construct npm packages. These instrucstions were tried out with version `1.120.0`.

    ```bash
    npm install @aws-cdk/aws-s3@1.120.0
    ```

- Open the file `lib/day01-s3-stack.ts`, and import the S3 package:

    ```typescript
    import { Bucket, BucketEncryption } from '@aws-cdk/aws-s3';
    ```

- Now below the line "// The code that defines your stack goes here". We are setting the encryption of the bucket to be managed by S3. And since this is tutorial we are setting the policy to delete all objects and delete/destroy the created bucket when you use the command `cdk destroy` to delete all resources created. In production systems this two lines on `removalPolicy` and `autoDeleteObjects` should not be present.

    ```typescript
    const s3bucket = new Bucket(this, 'day01s3bucket', {
      encryption: BucketEncryption.S3_MANAGED,    // Use S3 managed encryption
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true
    });
    ```

- Let's print out on the console the details about the S3 bucket that will be created. Import `CfnOuput` at the top of the file followed by statement showing the output.  
  
    ```typescript
    import { CfnOutput } from '@aws-cdk/core'; // This will go at the top where all the imports are

    // Add these lines after the creation of S3 bucket as shown in last step
    new CfnOutput(this, 'S3 Bucket Name', {
      value: s3bucket.bucketName,
      description: 'The name of an S3 bucket', // Optional
    });
    ```

- Now let's deploy the CDK stack using the following command, once you enter the command `cdk` will prompt you to confirming the deployment. Respond with `y` to continue deployment.

    ```bash
    cdk deploy --profile cdkapsouth1
    ```

- The `CfnOutput` command in the stack will lead to a console output on successful deployment as shown below. Note the `XXXXXXXXXXXXX` in the bucket name will be specific to your output since this is chosen (uniquely by the CDK/CloudFormation process for a globally unique bucket name)

    ```bash
    Outputs:
    Day01S3Stack.S3BucketName = day01s3stack-day01s3bucket099ef4ce-XXXXXXXXXXXX
    ```
