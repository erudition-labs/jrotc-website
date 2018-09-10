import { User } from '../user/user.model';
export interface Event {
	_id							?: string;
	name 						: string;
	isVerificationRequired 		: boolean;
	isVerified 					: boolean;
	isSignupRequired 			: boolean;
	date 						: any[];
	OIC 						: any[];
	signedUp 					: any[];
	additionalDetails			: string;
}
