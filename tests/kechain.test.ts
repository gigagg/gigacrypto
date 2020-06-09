import { expect } from 'chai';
import { Keychain } from './../lib/keychain';

describe('Crypto::Keychain', () => {
  it('should generate a keychain', async () => {
    const keychain = await Keychain.generate('gigatribe');
    expect(keychain).not.equal(null);
  });

  it('should import a keychain', async () => {
    const keychain = await Keychain.import('gigatribe', {
      nodeKey:
        'Am0TSBwizinOPkiECkXY6yWZtZae0xsKU1xSTBjpYTq/1UNVD2ICDicw8JgtYPHqmkdP4bcOCbdPQuGUQ/2mi3oyLsHHcgM2zluCoS8CkzDh7Q9C7yrAspUhGhgHgsAzIxEjbTa4iFeHwez41JGkEC+ucwboE089VlJkhsOxasI=',
      salt: 'FLOhgPcpK+IzLOqqzUw2Dbe3o47IsDitc2DBQNiU0i8=',
      rsaKeys: {
        dekInfo: {
          type: 'AES-128-CBC:1024',
          iv: '24etHeLAcj2Wp4n7xesV7Q==',
          salt: 'g68y7S8Vlwc=',
        },
        privateKey:
          'f/2y9dWg7PolO8kMbn1NSohL9w5djzqzvvJQ6gmvsk1xY3FkU77Q0Xy4Un8SM7grfDiFQtKr2xdTaGivwH0JZRAkdVvuEsYfq8DClyUZLxfVxzAme1Suwpey6Pl/9xpvhKvVt9eyQAlfPg/2llB074ibftPDQpNGpiRBwVvsHRRIC189mWM9UB1wa2bu4ZdHV+/oyxDoojWvXpfvZZjfa+qdrImtkRnQLeGR7aq3eXaZt5Ph0feYmb4viF7g1AE9nsQITSTbgzfnrqLvTwN5oCxlB+keD6bCx/TmK0Dh1G61ouHhZTPu8rcaA66/6MYz/TM+agMoNVrrqNMUZZXlO8fqE69dJsdcENK/2nGYapI+xpQtzRuD24AfvbwsoHfMSDirrN8MR2oWSbzwtkhfv9ULQq0+3H1u3kcwUz/cf/GCyxxcNAi7m1RAkezftLNE8GjJTevRxRT9v+CKh+166vrUClTOhaQH+E5mHB1hEG5jkPwjDkp05LNoEAbftEUkA1dYpDQGfUYJJcksSISeURQUj+mDcnlHGm2ENQa24XYxcSfeR3/eoe/OKmY13rZ3Uy+58XcUf/wkYw4Oz3Dr9/8zqi9wa+vaG7A5swEJXl2l6iP4zOqI7ukIkf2CAKSdLpCLeYH6dKBjHTC3itMEeToWpzdgzc4+JDUWi4inE93tIKUKbVJSmdNz6fSfj03cTKnvYGJWq7HeTH+Qy+0oWd+qZYcWyo4a90SQGc24HRNghs5doS6XjenNuWuVCHjiOQmTrpvqQzcXDaNzOVD++C6u9Fo5Fd4Xk4oOUTw+tgPolv5zV8TSi1avYHOFOCIhriqo8Zwo+UoxdaAp6r4xSU/qnPuUcUhVDYSx/dLyl0sM3y1ePz0lcMhb5wGBSPEfYGJeO7xWFabPXKfN5EuGD9GOSpdAjR4BtfQBkueY7yI/LCui1NJmEYGqLqbY/fWdKVq1N44nrcKqKEl1mi0saOz7dC6+PbcI2etyoICwa8cgCezJ/deaQgVPQV6QAxM31XSp6o584uZlD/c6C+TF9gb/Ma+mHb8hbLa80zb49OZ3VS0F1l9ArBEOuo3dQ7X+rzMXiUm/QdLU/fZeOqsT3w==',
        publicKey:
          'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCvupt+SoaJxTnyvzo7d2xtVvhe5N2qxhyW/OVNuh/OeWO2T+BZPJsh6n3+YV4mulsAxmbUvvwpL9EI3xynjw5WpSsXgNAg+s2mAbyGTAOLAlPlymBy1R57XA0DgnIfEh3mQsiWP9uaXp8V8PNkWNC6d+JtRUEImDFy+mFI5XIcQwIDAQAB',
      },
    });

    expect(keychain).not.equal(null);
  });
});
