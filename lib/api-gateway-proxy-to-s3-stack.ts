import * as cdk from '@aws-cdk/core';
import {RemovalPolicy, Stack} from '@aws-cdk/core';
import {HttpIntegration, RestApi} from "@aws-cdk/aws-apigateway";
import {Bucket} from "@aws-cdk/aws-s3";
import {BucketDeployment, Source} from "@aws-cdk/aws-s3-deployment";
import * as path from "path";

export class ApiGatewayProxyToS3Stack extends cdk.Stack {
    private api: RestApi;
    private readonly bucket: Bucket;
    private bucketDeployment: BucketDeployment;

    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        this.bucket = new Bucket(this, 'Bucket', {
            websiteIndexDocument: "index.html",
            websiteErrorDocument: 'index.html',
            publicReadAccess: true,

            removalPolicy: RemovalPolicy.DESTROY,
            autoDeleteObjects: true,
        });
        this.bucketDeployment = new BucketDeployment(this, 'BucketDeployment', {
            sources: [
                Source.asset(path.resolve(__dirname, './../public/'))
            ],
            destinationBucket: this.bucket,
        })

        this.api = new RestApi(this, id + '-RestApi');

        this.api.root
            .addResource('public')
            .addProxy({
                defaultIntegration: new HttpIntegration(this.bucket.bucketWebsiteUrl),
            });
    }
}
