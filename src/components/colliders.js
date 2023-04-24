import MovingItem from '@/components/moving-item';
import { Instances, Hydrant } from '@/components/models/hydrant';
import { BinInstances, Bin } from '@/components/models/bin';
import { MailboxInstances, Mailbox } from '@/components/models/mailbox';

const Colliders = ({ setColliders, obstacles }) => {
  return (
    <Instances>
      <BinInstances>
        <MailboxInstances>
          {obstacles.map(({ positionZ, type }, index) => (
            <MovingItem
              key={index}
              setColliders={setColliders}
              position={[0, 0.5, positionZ]}
              offset={(obstacles[obstacles.length - 1].positionZ / 2) + 1}
            >
              {type === 0 && (
                <Hydrant scale={0.3} position={[0, -.5, 0]} rotation-y={Math.PI} />
              )}
              {type === 1 && (
                <Bin scale={0.0065} position={[0, -.5, 0]} />
              )}
              {type === 2 && (
                <Mailbox scale={[0.6, 0.4, 0.4]} position={[0, -.6, 0]} rotation-y={Math.PI / 2} />
              )}
            </MovingItem>
          ))}
        </MailboxInstances>
      </BinInstances>
    </Instances>
  );
};

export default Colliders;
