import * as cdk from '@aws-cdk/core';
import { Bucket, BucketEncryption } from '@aws-cdk/aws-s3';
import { CfnOutput, RemovalPolicy } from '@aws-cdk/core';

export class Day01S3Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const s3bucket = new Bucket(this, 'day01s3bucket', {
      encryption: BucketEncryption.S3_MANAGED,    // Use S3 managed encryption
      removalPolicy: RemovalPolicy.DESTROY,       // Destroy the bucket when using cdk destroy, NOT for Production
      autoDeleteObjects: true
    });

    new CfnOutput(this, 'S3 Bucket Name', {
      value: s3bucket.bucketName,
      description: 'The name of an S3 bucket', // Optional
    });

  }
}
