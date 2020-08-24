import { container } from 'tsyringe';
import mailConfig from '@config/mail';
import IMailProvider from './models/IMailProvider';
import EtherialMailProvider from './implementations/EtherealMailProvider';

const providers = {
    ethereal: container.resolve(EtherialMailProvider),
};

container.registerInstance<IMailProvider>(
    'MailProvider',
    providers[mailConfig.driver],
);
