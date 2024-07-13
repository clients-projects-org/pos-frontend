import { DynamicIcon } from '@/components/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type ApiNotificationProps = {
	message: string;
	success: boolean;
	statusCode: number;
};

/* ApiError
     - check if error just show the error message
 */
export function ApiError({ data }: { data: ApiNotificationProps }) {
	if (data?.success) return null;
	return (
		<Alert variant={data?.success ? 'default' : 'destructive'}>
			<DynamicIcon icon="TriangleAlert" />
			<AlertTitle>Oops</AlertTitle>
			<AlertDescription>
				{(data?.message && data?.message) || 'Something went wrong'}
			</AlertDescription>
		</Alert>
	);
}

/* ApiResult
      - if not error but value is empty also check some of like 
	  - isLoading
	  - isError
	  - isSuccess
*/
export function ApiResult({ data }: { data: ApiNotificationProps }) {
	if (!data?.success) return null;
	return (
		<Alert>
			<DynamicIcon icon="Terminal" />
			<AlertTitle>Heads up!</AlertTitle>
			<AlertDescription>
				You can add components to your app using the cli.
			</AlertDescription>
		</Alert>
	);
}
