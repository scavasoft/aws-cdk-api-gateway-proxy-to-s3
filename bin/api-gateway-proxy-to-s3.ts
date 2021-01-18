#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ApiGatewayProxyToS3Stack } from '../lib/api-gateway-proxy-to-s3-stack';

const app = new cdk.App();
new ApiGatewayProxyToS3Stack(app, 'ApiGatewayProxyToS3Stack');
