import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MarketWithActivity } from 'src/types/market';
import MarketCard from 'src/components/markets/market-card';

const data = MarketWithActivity.parse({
  uuid: 'dc837c76-faa5-458b-981a-e43cb83c4af9',
  question:
    'After migrating to Kafka, will we still experience >30min lag on more than one topic on LSO morning ingest',
  description:
    'Right now, when we get LSO data, we see multiple durable event streams start lagging. After we have fully moved to kafka, would we still see this type of lag?',
  createdAt: '2023-02-06T17:30:12.042Z',
  updatedAt: '2023-02-06T17:30:12.042Z',
  resolvedAt: undefined,
  closedAt: undefined,
  createdByUser: {
    uuid: '6e8c2491-a842-4f71-9084-275b6020571b',
    email: 'evan@loop.com',
    name: 'Evan Richards',
    createdAt: '2022-12-31T03:13:31.667Z',
    updatedAt: '2023-02-08T01:28:50.040Z',
    lastLogin: '2023-02-08T01:28:50.038Z',
  },
  marketLedger: [
    {
      uuid: '0cc193f7-6b50-4c26-9900-e58d2d5dc373',
      marketAlignment: 'YES',
      marketUuid: 'dc837c76-faa5-458b-981a-e43cb83c4af9',
      transactionType: 'SELL',
      userUuid: '6e8c2491-a842-4f71-9084-275b6020571b',
      createdAt: '2023-02-06T17:49:58.076Z',
    },
    {
      uuid: '132e9687-a776-45fc-a3b0-46d5555a27d4',
      marketAlignment: 'YES',
      marketUuid: 'dc837c76-faa5-458b-981a-e43cb83c4af9',
      transactionType: 'BUY',
      userUuid: '2b94d721-4da1-41af-92c6-aa462fe3439d',
      createdAt: '2023-02-08T22:29:37.371Z',
    },
    {
      uuid: '16db980c-8d8f-4b6b-ba49-ac441c7b77f5',
      marketAlignment: 'YES',
      marketUuid: 'dc837c76-faa5-458b-981a-e43cb83c4af9',
      transactionType: 'BUY',
      userUuid: 'cc1ede34-eafe-42ab-8302-0fceeb2f711a',
      createdAt: '2023-02-06T17:49:19.045Z',
    },
    {
      uuid: '1ac310aa-3626-4974-a38b-05ea50bca3a4',
      marketAlignment: 'NO',
      marketUuid: 'dc837c76-faa5-458b-981a-e43cb83c4af9',
      transactionType: 'BUY',
      userUuid: '6e8c2491-a842-4f71-9084-275b6020571b',
      createdAt: '2023-02-06T17:30:29.184Z',
    },
    {
      uuid: '1ca7ae66-4350-4eb6-842a-d613f4855715',
      marketAlignment: 'NO',
      marketUuid: 'dc837c76-faa5-458b-981a-e43cb83c4af9',
      transactionType: 'BUY',
      userUuid: 'a4da1390-006e-4c15-9efb-8ab86d340e5b',
      createdAt: '2023-02-06T17:40:46.772Z',
    },
    {
      uuid: '29c543bf-1081-4117-95b8-424f1cdfedae',
      marketAlignment: 'YES',
      marketUuid: 'dc837c76-faa5-458b-981a-e43cb83c4af9',
      transactionType: 'BUY',
      userUuid: 'cc1ede34-eafe-42ab-8302-0fceeb2f711a',
      createdAt: '2023-02-06T17:49:11.324Z',
    },
    {
      uuid: '2fb14b6a-3b52-47b7-a88c-92e58a06c37e',
      marketAlignment: 'YES',
      marketUuid: 'dc837c76-faa5-458b-981a-e43cb83c4af9',
      transactionType: 'BUY',
      userUuid: '2b94d721-4da1-41af-92c6-aa462fe3439d',
      createdAt: '2023-02-08T22:29:35.522Z',
    },
    {
      uuid: '318175d8-52fb-45e7-b72e-8e4ba7af798d',
      marketAlignment: 'NO',
      marketUuid: 'dc837c76-faa5-458b-981a-e43cb83c4af9',
      transactionType: 'BUY',
      userUuid: 'cc1ede34-eafe-42ab-8302-0fceeb2f711a',
      createdAt: '2023-02-06T17:46:45.803Z',
    },
    {
      uuid: '49d6ba3c-6b4a-4970-8454-9d5691c3e97a',
      marketAlignment: 'NO',
      marketUuid: 'dc837c76-faa5-458b-981a-e43cb83c4af9',
      transactionType: 'BUY',
      userUuid: '0abc1b6d-fd57-48ec-9d16-6704dec3fae5',
      createdAt: '2023-02-06T17:42:32.812Z',
    },
    {
      uuid: '4a53ab4a-8119-4a55-a8a5-403231ecb51b',
      marketAlignment: 'NO',
      marketUuid: 'dc837c76-faa5-458b-981a-e43cb83c4af9',
      transactionType: 'BUY',
      userUuid: 'cc1ede34-eafe-42ab-8302-0fceeb2f711a',
      createdAt: '2023-02-06T17:49:16.652Z',
    },
    {
      uuid: '5708089d-4b2c-4130-9580-421d45f5524e',
      marketAlignment: 'YES',
      marketUuid: 'dc837c76-faa5-458b-981a-e43cb83c4af9',
      transactionType: 'BUY',
      userUuid: 'cc1ede34-eafe-42ab-8302-0fceeb2f711a',
      createdAt: '2023-02-06T17:49:10.197Z',
    },
    {
      uuid: '5a965a53-ac22-409e-8186-a15388f42405',
      marketAlignment: 'YES',
      marketUuid: 'dc837c76-faa5-458b-981a-e43cb83c4af9',
      transactionType: 'BUY',
      userUuid: 'cc1ede34-eafe-42ab-8302-0fceeb2f711a',
      createdAt: '2023-02-06T17:47:29.836Z',
    },
    {
      uuid: '63caa9ad-acd4-4a67-ac68-7bb31bd431c1',
      marketAlignment: 'NO',
      marketUuid: 'dc837c76-faa5-458b-981a-e43cb83c4af9',
      transactionType: 'BUY',
      userUuid: '0abc1b6d-fd57-48ec-9d16-6704dec3fae5',
      createdAt: '2023-02-06T17:53:34.705Z',
    },
    {
      uuid: '6405f210-c5a0-41d4-9df1-e5faef1b385c',
      marketAlignment: 'NO',
      marketUuid: 'dc837c76-faa5-458b-981a-e43cb83c4af9',
      transactionType: 'BUY',
      userUuid: '0abc1b6d-fd57-48ec-9d16-6704dec3fae5',
      createdAt: '2023-02-06T17:53:35.661Z',
    },
    {
      uuid: '6670ff14-bdf9-4344-9291-a16fb68a0c38',
      marketAlignment: 'YES',
      marketUuid: 'dc837c76-faa5-458b-981a-e43cb83c4af9',
      transactionType: 'BUY',
      userUuid: '6e8c2491-a842-4f71-9084-275b6020571b',
      createdAt: '2023-02-06T17:40:20.765Z',
    },
    {
      uuid: '6aa0d0e5-f486-4228-8afa-ec4a4bf7e8b6',
      marketAlignment: 'NO',
      marketUuid: 'dc837c76-faa5-458b-981a-e43cb83c4af9',
      transactionType: 'BUY',
      userUuid: 'cc1ede34-eafe-42ab-8302-0fceeb2f711a',
      createdAt: '2023-02-06T17:49:13.091Z',
    },
    {
      uuid: '6caac5d4-9e55-4916-b3d5-3e0dd7ece0b8',
      marketAlignment: 'YES',
      marketUuid: 'dc837c76-faa5-458b-981a-e43cb83c4af9',
      transactionType: 'SELL',
      userUuid: 'cc1ede34-eafe-42ab-8302-0fceeb2f711a',
      createdAt: '2023-02-06T17:47:21.593Z',
    },
    {
      uuid: '6da0d10c-a96b-4146-b866-83fa122f1a84',
      marketAlignment: 'NO',
      marketUuid: 'dc837c76-faa5-458b-981a-e43cb83c4af9',
      transactionType: 'BUY',
      userUuid: '0abc1b6d-fd57-48ec-9d16-6704dec3fae5',
      createdAt: '2023-02-06T17:50:00.401Z',
    },
    {
      uuid: '7d41c3f3-2813-490e-8efc-135381dbc83d',
      marketAlignment: 'YES',
      marketUuid: 'dc837c76-faa5-458b-981a-e43cb83c4af9',
      transactionType: 'BUY',
      userUuid: 'e8922f27-dc79-477b-85c7-f21928199d68',
      createdAt: '2023-02-06T19:53:06.903Z',
    },
    {
      uuid: '819d7a53-ae18-4678-9aeb-7c40c2a004fc',
      marketAlignment: 'YES',
      marketUuid: 'dc837c76-faa5-458b-981a-e43cb83c4af9',
      transactionType: 'BUY',
      userUuid: 'cc1ede34-eafe-42ab-8302-0fceeb2f711a',
      createdAt: '2023-02-06T17:49:21.294Z',
    },
    {
      uuid: '81e5f551-1eaa-45c6-bf67-d1138c2e9670',
      marketAlignment: 'YES',
      marketUuid: 'dc837c76-faa5-458b-981a-e43cb83c4af9',
      transactionType: 'BUY',
      userUuid: 'cc1ede34-eafe-42ab-8302-0fceeb2f711a',
      createdAt: '2023-02-06T17:47:38.344Z',
    },
    {
      uuid: '915404a4-0689-49d6-aef4-aa1f0de32022',
      marketAlignment: 'NO',
      marketUuid: 'dc837c76-faa5-458b-981a-e43cb83c4af9',
      transactionType: 'BUY',
      userUuid: 'cc1ede34-eafe-42ab-8302-0fceeb2f711a',
      createdAt: '2023-02-06T17:47:30.722Z',
    },
    {
      uuid: '9aa9e600-f354-4a65-8a03-e468acc928cb',
      marketAlignment: 'YES',
      marketUuid: 'dc837c76-faa5-458b-981a-e43cb83c4af9',
      transactionType: 'BUY',
      userUuid: 'cc1ede34-eafe-42ab-8302-0fceeb2f711a',
      createdAt: '2023-02-06T17:47:31.662Z',
    },
    {
      uuid: '9fcb1396-1028-4d52-a98b-7a0dcadb30c7',
      marketAlignment: 'NO',
      marketUuid: 'dc837c76-faa5-458b-981a-e43cb83c4af9',
      transactionType: 'BUY',
      userUuid: '6e8c2491-a842-4f71-9084-275b6020571b',
      createdAt: '2023-02-06T17:40:17.740Z',
    },
    {
      uuid: 'a0f1872c-1efc-4382-924b-55465b72a525',
      marketAlignment: 'NO',
      marketUuid: 'dc837c76-faa5-458b-981a-e43cb83c4af9',
      transactionType: 'BUY',
      userUuid: 'cc1ede34-eafe-42ab-8302-0fceeb2f711a',
      createdAt: '2023-02-06T17:49:14.882Z',
    },
    {
      uuid: 'a63a716a-1664-49d8-9cce-8c6c43dc73a4',
      marketAlignment: 'YES',
      marketUuid: 'dc837c76-faa5-458b-981a-e43cb83c4af9',
      transactionType: 'BUY',
      userUuid: 'cc1ede34-eafe-42ab-8302-0fceeb2f711a',
      createdAt: '2023-02-06T17:47:37.090Z',
    },
    {
      uuid: 'a8e378d7-3f97-49e6-b12f-72a5d156530c',
      marketAlignment: 'NO',
      marketUuid: 'dc837c76-faa5-458b-981a-e43cb83c4af9',
      transactionType: 'BUY',
      userUuid: 'cc1ede34-eafe-42ab-8302-0fceeb2f711a',
      createdAt: '2023-02-06T17:49:15.462Z',
    },
    {
      uuid: 'ab36acad-5244-460b-8983-ae8924d0f6b4',
      marketAlignment: 'NO',
      marketUuid: 'dc837c76-faa5-458b-981a-e43cb83c4af9',
      transactionType: 'BUY',
      userUuid: '5d7faf9a-b6e8-4542-9b4d-49ae3096f621',
      createdAt: '2023-02-08T22:25:59.481Z',
    },
    {
      uuid: 'af8a5c52-4228-4ae0-9421-1222301b3bd6',
      marketAlignment: 'NO',
      marketUuid: 'dc837c76-faa5-458b-981a-e43cb83c4af9',
      transactionType: 'BUY',
      userUuid: '5d7faf9a-b6e8-4542-9b4d-49ae3096f621',
      createdAt: '2023-02-08T22:26:01.193Z',
    },
    {
      uuid: 'b03288da-39cc-4fc1-95d2-ab98e5785d4f',
      marketAlignment: 'YES',
      marketUuid: 'dc837c76-faa5-458b-981a-e43cb83c4af9',
      transactionType: 'BUY',
      userUuid: 'cc1ede34-eafe-42ab-8302-0fceeb2f711a',
      createdAt: '2023-02-06T17:49:08.912Z',
    },
    {
      uuid: 'b5a8fe17-2b29-479e-9f2d-f8fd17693579',
      marketAlignment: 'NO',
      marketUuid: 'dc837c76-faa5-458b-981a-e43cb83c4af9',
      transactionType: 'BUY',
      userUuid: '5d7faf9a-b6e8-4542-9b4d-49ae3096f621',
      createdAt: '2023-02-08T22:25:58.723Z',
    },
    {
      uuid: 'bc16a6f2-e199-4344-a994-3a7c74c1a45c',
      marketAlignment: 'NO',
      marketUuid: 'dc837c76-faa5-458b-981a-e43cb83c4af9',
      transactionType: 'BUY',
      userUuid: 'cc1ede34-eafe-42ab-8302-0fceeb2f711a',
      createdAt: '2023-02-06T17:47:24.348Z',
    },
    {
      uuid: 'bde71ad5-6129-4a78-b886-7135046777d6',
      marketAlignment: 'YES',
      marketUuid: 'dc837c76-faa5-458b-981a-e43cb83c4af9',
      transactionType: 'BUY',
      userUuid: '894fcbc2-5f19-417b-b2da-1ee0657eef8b',
      createdAt: '2023-02-06T19:59:37.035Z',
    },
    {
      uuid: 'c523e07c-d21c-4125-bdb7-bb0efe7390c0',
      marketAlignment: 'NO',
      marketUuid: 'dc837c76-faa5-458b-981a-e43cb83c4af9',
      transactionType: 'BUY',
      userUuid: '5d7faf9a-b6e8-4542-9b4d-49ae3096f621',
      createdAt: '2023-02-08T22:25:53.856Z',
    },
    {
      uuid: 'cea9b584-09f2-4b73-b1b2-c549f1f2ebf6',
      marketAlignment: 'YES',
      marketUuid: 'dc837c76-faa5-458b-981a-e43cb83c4af9',
      transactionType: 'BUY',
      userUuid: 'cc1ede34-eafe-42ab-8302-0fceeb2f711a',
      createdAt: '2023-02-06T17:47:39.321Z',
    },
    {
      uuid: 'd5a17d0c-1196-4970-baed-67138b370812',
      marketAlignment: 'NO',
      marketUuid: 'dc837c76-faa5-458b-981a-e43cb83c4af9',
      transactionType: 'BUY',
      userUuid: 'cc1ede34-eafe-42ab-8302-0fceeb2f711a',
      createdAt: '2023-02-06T17:49:14.075Z',
    },
    {
      uuid: 'd817aab9-5241-41f2-94c8-6c2a76bac048',
      marketAlignment: 'YES',
      marketUuid: 'dc837c76-faa5-458b-981a-e43cb83c4af9',
      transactionType: 'BUY',
      userUuid: 'cc1ede34-eafe-42ab-8302-0fceeb2f711a',
      createdAt: '2023-02-06T17:47:32.907Z',
    },
    {
      uuid: 'e6f1eaaa-0d3a-4702-9cd7-af9974e82b86',
      marketAlignment: 'YES',
      marketUuid: 'dc837c76-faa5-458b-981a-e43cb83c4af9',
      transactionType: 'BUY',
      userUuid: 'cc1ede34-eafe-42ab-8302-0fceeb2f711a',
      createdAt: '2023-02-06T17:46:44.418Z',
    },
    {
      uuid: 'f091b0b0-fa56-4f43-ae4d-4fd9fe9e61fc',
      marketAlignment: 'NO',
      marketUuid: 'dc837c76-faa5-458b-981a-e43cb83c4af9',
      transactionType: 'BUY',
      userUuid: '5d7faf9a-b6e8-4542-9b4d-49ae3096f621',
      createdAt: '2023-02-08T22:26:00.116Z',
    },
    {
      uuid: 'f6923c6c-74a9-4e9e-8b2d-550bdc26d3d0',
      marketAlignment: 'NO',
      marketUuid: 'dc837c76-faa5-458b-981a-e43cb83c4af9',
      transactionType: 'BUY',
      userUuid: '0abc1b6d-fd57-48ec-9d16-6704dec3fae5',
      createdAt: '2023-02-06T17:50:02.611Z',
    },
    {
      uuid: 'f7fb3b03-82a9-42db-84f0-b7daa6c670dc',
      marketAlignment: 'NO',
      marketUuid: 'dc837c76-faa5-458b-981a-e43cb83c4af9',
      transactionType: 'SELL',
      userUuid: '0abc1b6d-fd57-48ec-9d16-6704dec3fae5',
      createdAt: '2023-02-06T17:51:57.361Z',
    },
  ],
});

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'MarketCard',
  component: MarketCard,
} as ComponentMeta<typeof MarketCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof MarketCard> = (args) => (
  <MarketCard {...args} />
);
const defaultArgs = {
  handleBuyYes: () => {
    console.log('Buy Yes');
  },
  handleBuyNo: () => {
    console.log('Buy No');
  },
  handleSellYes: () => {
    console.log('Sell Yes');
  },
  handleSellNo: () => {
    console.log('Sell No');
  },
  marketData: data,
  ledger: data.marketLedger,
};

export const Participant = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Participant.args = {
  ...defaultArgs,
};

export const Closed = Template.bind({});
Closed.args = {
  ...defaultArgs,
  marketData: {
    ...defaultArgs.marketData,
    closedAt: new Date('2023-02-16').toISOString(),
  },
};

export const Resolved = Template.bind({});
Resolved.args = {
  ...defaultArgs,
  marketData: {
    ...defaultArgs.marketData,
    closedAt: new Date('2023-02-16').toISOString(),
    resolvedAt: new Date('2023-02-20').toISOString(),
  },
};
